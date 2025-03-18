package com.example.store.controllers;


import com.example.store.dto.AuthResponseDto;
import com.example.store.dto.LoginDto;
import com.example.store.dto.RegisterDto;
import com.example.store.models.Address;
import com.example.store.models.Role;
import com.example.store.models.UserEntity;
import com.example.store.repository.RoleRepository;
import com.example.store.repository.UserRepository;
import com.example.store.security.JWTGenerator;
import com.example.store.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/auth/")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private UserService userService;
    private JWTGenerator jwtGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
                          RoleRepository roleRepository, PasswordEncoder passwordEncoder,UserService userService, JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("register")
    public ResponseEntity<Long> register(@RequestBody RegisterDto registerDto) {
        if (userRepository.existsByUsername(registerDto.getUsername())) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        UserEntity user = new UserEntity();
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));//mniej nawiasów

        Role roles = roleRepository.findByName("USER").get();
        user.setRoles(Collections.singletonList(roles));

        // Tworzenie pustego obiektu Address
        Address address = new Address();
        user.setAddress(address);

        userRepository.save(user);

        Long userId = user.getId();
        return new ResponseEntity<>(userId, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);

        // Pobierz ID użytkownika na podstawie nazwy użytkownika
        Long userId = userService.getUserIdByUsername(loginDto.getUsername());

        // Pobierz role użytkownika na podstawie ID użytkownika
        Integer userRole = userService.getUserRoles(userId);


        // Zwróć odpowiedź zawierającą token, ID użytkownika i ID roli
        AuthResponseDto responseDto = new AuthResponseDto(token, userId, userRole);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/role/{userId}")
    public ResponseEntity<Integer> getRole(@PathVariable Long userId) {
        Integer userRole = userService.getUserRoles(userId);
        return ResponseEntity.ok(userRole);
    }


}
