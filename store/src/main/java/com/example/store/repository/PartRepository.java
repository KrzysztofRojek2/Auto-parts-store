package com.example.store.repository;

import com.example.store.models.Brand;
import com.example.store.models.Category;
import com.example.store.models.Part;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//public interface PartRepository extends JpaRepository<Part, Long> {
//    List<Part> findAllByCategory(int categoryId, Pageable pageable);
//    List<Part> findAllByCategory(int categoryId);
//    List<Part> findAllByCarBrand(Brand carBrand);
//    List<Part> findAllByCategoryAndCarBrand(int categoryId, Brand carBrand);
//
//}
public interface PartRepository extends JpaRepository<Part, Long> {
    List<Part> findAllByCategory(Category category, Pageable pageable);
    List<Part> findAllByCategory(Category category);
    List<Part> findAllByCar_Brand(Brand carBrand);
    List<Part> findAllByCategoryAndCar_Brand(Category category, Brand carBrand);

    Page<Part> findByCategory_Id(Integer categoryId, Pageable pageable);
}