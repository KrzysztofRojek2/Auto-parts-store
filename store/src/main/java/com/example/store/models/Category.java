package com.example.store.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue
    private Integer id;

    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Part> parts = new ArrayList<>();
//    Silniki i osprzęt
//
//    Układ hamulcowy
//
//    Układ wydechowy
//
//    Układ chłodzenia
//
//    Elektronika samochodowa
//
//    Zawieszenie i układ kierowniczy
}
