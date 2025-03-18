package com.example.store.service.implementation;

import com.example.store.dto.PartDto;
import com.example.store.dto.TransactionDto;
import com.example.store.exceptions.PartNotFoundException;
import com.example.store.exceptions.UserNotFoundException;
import com.example.store.models.*;
import com.example.store.repository.*;
import com.example.store.service.PartService;
import com.example.store.service.TransactionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.example.store.dto.TransactionPartDto;
import java.time.LocalDateTime;


import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
//package com.example.store.dto;
import static com.example.store.models.Status.*;

@Service
public class TransactionServiceImplementation implements TransactionService {

    private TransactionRepository transactionRepository;
    private UserRepository userRepository;
    private PartRepository partRepository;
    private PartService partService;
    private TransactionPartRepository transactionPartRepository;
    private ShippingRepository shippingRepository;
    private static final Logger logger = LoggerFactory.getLogger(TransactionServiceImplementation.class);

    public TransactionServiceImplementation( TransactionRepository transactionRepository, UserRepository userRepository,
                                             PartRepository partRepository, PartService partService,
                                             TransactionPartRepository transactionPartRepository,
                                             ShippingRepository shippingRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.partRepository = partRepository;
        this.partService = partService;
        this.transactionPartRepository = transactionPartRepository;
        this.shippingRepository = shippingRepository;
    }

    @Override
    public TransactionDto createTransaction(Long userId) {
        Transaction transaction = new Transaction();
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        transaction.setPrice(0.0);
        transaction.setStatus(CART);
        transaction.setUser(user);
//        transaction.setTransactionParts();
        transactionRepository.save(transaction);

        return mapToDto(transaction);
    }

    @Override
    public TransactionDto getTransaction(Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId).orElseThrow(() -> new RuntimeException("Transaction not found"));
        return mapToDto(transaction);
    }

    @Override
    public TransactionDto getOngoingTransaction(Long userId) {
        Transaction transaction = transactionRepository.findByUserIdAndStatus(userId, CART)
                .orElseThrow(() -> new RuntimeException("Ongoing transaction not found"));
        return mapToDto(transaction);
    }

    @Override
    public List<TransactionDto> getPassedTransactions(Long userId) {
        List<Transaction> transactions = transactionRepository.findByUserIdAndStatusNot(userId, CART);
        return transactions.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<TransactionDto> getAllAwaitingTransactions() {
        List<Transaction> transactions = transactionRepository.findByStatus(PAID);
        return transactions.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<TransactionDto> getAllApprovedTransactions() {
        List<Transaction> transactions = transactionRepository.findByStatus(SHIPPED);
        return transactions.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<TransactionDto> getAwaitingTransactions(Long userId) {
        Optional<Transaction> transactions = transactionRepository.findByUserIdAndStatus(userId, PAID);
        return transactions.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public TransactionDto increaseQuantity(Long transactionId, Long partId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        Part part = partRepository.findById(partId)
                .orElseThrow(() -> new PartNotFoundException("Part not found with id: " + partId));

        TransactionPart transactionPart = transactionPartRepository.findByTransactionAndPart(transaction, part)
                .orElseThrow(() -> new RuntimeException("Transaction part not found"));

        // Zwiększenie ilości produktu
        int newQuantity = transactionPart.getQuantity() + 1;
        transactionPart.setQuantity(newQuantity);

        transaction.setPrice(transaction.getPrice() + part.getPrice());
        transactionRepository.save(transaction);

        // Aktualizacja ceny transakcji (jeśli konieczne)
        // transaction.setPrice(transaction.getPrice() + (part.getPrice() * newQuantity)); // Jeśli cena produktu jest zapisywana w transakcji

        transactionPartRepository.save(transactionPart);

        return mapToDto(transaction);
    }

    @Override
    public TransactionDto decreaseQuantity(Long transactionId, Long partId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        Part part = partRepository.findById(partId)
                .orElseThrow(() -> new PartNotFoundException("Part not found with id: " + partId));

        TransactionPart transactionPart = transactionPartRepository.findByTransactionAndPart(transaction, part)
                .orElseThrow(() -> new RuntimeException("Transaction part not found"));

        transaction.setPrice(transaction.getPrice() - part.getPrice());
        transactionRepository.save(transaction);
        // Zmniejszenie ilości produktu
        int newQuantity = transactionPart.getQuantity() - 1;

        if (newQuantity <= 0) {
            // Usunięcie produktu z zamówienia, jeśli ilość spadła do zera
            transaction.getTransactionParts().remove(transactionPart);
            transactionPartRepository.delete(transactionPart);
        } else {
            transactionPart.setQuantity(newQuantity);
            transactionPartRepository.save(transactionPart);
        }

        // Aktualizacja ceny transakcji (jeśli konieczne)
        // transaction.setPrice(transaction.getPrice() - part.getPrice()); // Jeśli cena produktu jest zapisywana w transakcji

        return mapToDto(transaction);
    }

    @Override
    public TransactionDto setShipping(Long transactionId, int shippingId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + transactionId));

        Shipping newShipping = shippingRepository.findById(shippingId)
                .orElseThrow(() -> new RuntimeException("Shipping not found with id: " + shippingId));

//        Shipping currentShipping = transaction.getShipping();
//        if (currentShipping != null) {
//            transaction.setPrice(transaction.getPrice() - currentShipping.getPrice());
//        }

        transaction.setShipping(newShipping);
        //transaction.setPrice(transaction.getPrice() + newShipping.getPrice());

        transactionRepository.save(transaction);

        transaction.setShipping(newShipping);
        transactionRepository.save(transaction);
        return mapToDto(transaction);
    }

    @Override
    public TransactionDto changeTransactionStatus(Long transactionId, Status status) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + transactionId));

        try {
            Status.valueOf(status.name());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid transaction status");
        }

        Shipping shipping = transaction.getShipping();
        transaction.setPrice(transaction.getPrice() + shipping.getPrice());

        transaction.setStatus(status);
        transactionRepository.save(transaction);

        return mapToDto(transaction);
    }
    @Override
    public TransactionDto changeTransactionStatus2(Long transactionId, Status status) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + transactionId));

        try {
            Status.valueOf(status.name());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid transaction status");
        }

        transaction.setStatus(status);
        transactionRepository.save(transaction);

        return mapToDto(transaction);
    }

    @Override
    public TransactionDto putDate(long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + transactionId));

        transaction.setDate(LocalDateTime.now());
        transactionRepository.save(transaction);

        return mapToDto(transaction);
    }

    @Override
    public void putPartInTransaction(Long partId, Long transactionId) {
        logger.info("Starting putPartInTransaction with partId: {} and transactionId: {}", partId, transactionId);

        Part part = partRepository.findById(partId)
                .orElseThrow(() -> {
                    logger.error("Part not found with id: {}", partId);
                    return new PartNotFoundException("Part not found with id: " + partId);
                });

        logger.info("Found part with id: {}", part.getId());

        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> {
                    logger.error("Transaction not found with id: {}", transactionId);
                    return new RuntimeException("Transaction not found with id: " + transactionId);
                });

        logger.info("Found transaction with id: {}", transaction.getId());

        Optional<TransactionPart> transactionPartOpt = transactionPartRepository.findByTransactionAndPart(transaction, part);

        logger.info("Current transaction price: {}", transaction.getPrice());
        logger.info("Adding part price: {} to transaction", part.getPrice());

        transaction.setPrice(transaction.getPrice() + part.getPrice());
        transactionRepository.save(transaction);

        logger.info("Updated transaction price: {}", transaction.getPrice());

        if (transactionPartOpt.isPresent()) {
            TransactionPart transactionPart = transactionPartOpt.get();
            logger.info("TransactionPart already exists. Increasing quantity by 1.");
            transactionPart.setQuantity(transactionPart.getQuantity() + 1);
            transactionPartRepository.save(transactionPart);
            logger.info("Updated TransactionPart quantity: {}", transactionPart.getQuantity());

        } else {
            logger.info("Creating new TransactionPart.");
            TransactionPart newTransactionPart = new TransactionPart();
            newTransactionPart.setTransaction(transaction);
            newTransactionPart.setPart(part);
            newTransactionPart.setQuantity(1);
            transactionPartRepository.save(newTransactionPart);
            logger.info("Saved new TransactionPart with quantity 1");
        }

        logger.info("Finished putPartInTransaction with partId: {} and transactionId: {}", partId, transactionId);
    }

    private TransactionDto mapToDto(Transaction transaction) {
        TransactionDto transactionDto = new TransactionDto();
        transactionDto.setId(transaction.getId());
        transactionDto.setPrice(transaction.getPrice());
        transactionDto.setStatus(transaction.getStatus());
        transactionDto.setDate(transaction.getDate());
        transactionDto.setUserId(transaction.getUser().getId());

        if (transaction.getShipping() != null) {
            transactionDto.setShippingId(transaction.getShipping().getId());
        } else {
            transactionDto.setShippingId(null);
        }

        // Pobieranie danych o częściach dla danej transakcji
        List<TransactionPart> transactionParts = transactionPartRepository.findByTransaction(transaction);

        // Mapowanie części do DTO
        Set<TransactionPartDto> transactionPartDtos = transactionParts.stream()
                .map(tp -> {
                    TransactionPartDto transactionPartDto = new TransactionPartDto();
                    transactionPartDto.setPartDto(mapToPartDto(tp.getPart()));
                    transactionPartDto.setQuantity(tp.getQuantity());
                    return transactionPartDto;
                })
                .collect(Collectors.toSet());

        transactionDto.setTransactionParts(transactionPartDtos);

        return transactionDto;
    }

    private PartDto mapToPartDto(Part part) {
        PartDto partDto = new PartDto();
        partDto.setId(part.getId());
        partDto.setName(part.getName());
        partDto.setDescription(part.getDescription());
        partDto.setPrice(part.getPrice());
        partDto.setDiscount(part.getDiscount());
        partDto.setQuantity(part.getQuantity());
        partDto.setCarId(part.getCar().getId());
        partDto.setImage(part.getImage());
        partDto.setCategoryId(part.getCategory().getId());
        return partDto;
    }
}
