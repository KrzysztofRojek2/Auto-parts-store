package com.example.store.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "parts")
public class Part {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String description;
    private String image;
    private Double price;
    private int discount;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "category_id") // Nazwa kolumny w tabeli parts, która będzie przechowywać klucz obcy do tabeli categories
    private Category category;

    @ManyToOne
    @JoinColumn(name = "car_id") // Nazwa kolumny w tabeli parts, która będzie przechowywać klucz obcy do tabeli cars
    private Car car;

    @OneToMany(mappedBy = "part", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "part", cascade = CascadeType.ALL)
    private Set<TransactionPart> transactionParts = new HashSet<>();

//    @ManyToMany
//    @JoinTable(name = "transaction_parts",
//            joinColumns = @JoinColumn(name = "transaction_id"),
//            inverseJoinColumns = @JoinColumn(name = "part_id"))
//    private Set<Part> parts = new HashSet<>();
}
