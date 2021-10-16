package com.codegym.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;


@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeId;
    private String name;

    @JsonBackReference
    @OneToMany(mappedBy = "startingPoint", cascade = CascadeType.ALL)
    private List<Car> listCar;

    @JsonBackReference
    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL)
    private List<Car> listCarArrival;
}
