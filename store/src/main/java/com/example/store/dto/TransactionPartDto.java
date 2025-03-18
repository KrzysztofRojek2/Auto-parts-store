package com.example.store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionPartDto {
//    private Long partId;
//    private String partName;
    private PartDto partDto;
    private int quantity;
}