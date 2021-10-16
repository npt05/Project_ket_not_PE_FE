package com.codegym.model.service;

import com.codegym.model.entity.Car;
import com.codegym.model.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CarServiceImpl implements ICarService{
    @Autowired
    private CarRepository carRepository;
    @Override
    public Page<Car> findAll(Pageable pageable) {
        return carRepository.findAll(pageable);
    }

    @Override
    public Optional<Car> findById(Long id) {
        return carRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        this.carRepository.deleteById(id);
    }

    @Override
    public Car save(Car car) {
        return this.carRepository.save(car);
    }




}
