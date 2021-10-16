package com.codegym.model.service;

import com.codegym.model.entity.Place;
import com.codegym.model.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceServiceImpl implements IPlaceService {
    @Autowired
    private PlaceRepository placeRepository;

    @Override
    public List<Place> findAll() {
        return placeRepository.findAll();
    }
}
