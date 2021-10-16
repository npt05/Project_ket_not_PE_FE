package com.codegym.model.service;

import com.codegym.model.entity.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.Optional;

public interface ICarService {

    Page<Car> findAll(Pageable pageable);

    Optional<Car> findById(Long id);

    void delete(Long id);

    Car save(Car car);

}
