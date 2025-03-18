package com.example.store.service;

import com.example.store.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto getUserById(Long id);
    UserDto updateUser(UserDto userDto, Long id);
    Long getUserIdByUsername(String username);

    Integer getUsersCount();

    Integer getUserRoles(Long userId);
}