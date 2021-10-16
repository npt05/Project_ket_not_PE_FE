package com.codegym.controller;

import com.codegym.model.entity.Car;
import com.codegym.model.entity.Place;
import com.codegym.model.service.ICarService;
import com.codegym.model.service.IPlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = {"/"})
public class CarRestController {
    @Autowired
    private ICarService carService;
    @Autowired
    private IPlaceService locationService;


    @GetMapping("/location")
    public ResponseEntity<List<Place>> getListLocation() {
        List<Place> placeList = locationService.findAll();
        if (placeList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(placeList, HttpStatus.OK);
    }

    @GetMapping(value = "/car")
    public ResponseEntity<Page<Car>> findAllList(@PageableDefault(value = 2) Pageable pageable){
        Page<Car> cars = this.carService.findAll(pageable);
        if(cars == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(cars,HttpStatus.OK);
    }

    @PutMapping( value = "/car/{id}")
    public ResponseEntity<Car> editCar(@PathVariable Long id, @RequestBody Car car) {
        Optional<Car> carOptional = carService.findById(id);

        if (!carOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        carService.save(car);
        return new ResponseEntity<>(car, HttpStatus.OK);
    }


    @PostMapping(value = "/car")
    public ResponseEntity<Car> createBus(@RequestBody Car car) {
        return new ResponseEntity<>(carService.save(car), HttpStatus.OK);
    }

    @DeleteMapping("/car/{id}")

    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        Optional<Car> carOptional = carService.findById(id);
        if (!carOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        carService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/car/{id}")
        public ResponseEntity<Car> getCar(@PathVariable Long id) {
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Optional<Car> carOptional = carService.findById(id);
        if(!carOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(carOptional.get(), HttpStatus.OK);
    }
}
