package com.codegym.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phone;
    private String email;
    private String starTime;
    private String endTime;
    private String carType;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "location", referencedColumnName = "placeId")
    private Place startingPoint;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "destination", referencedColumnName = "placeId")
    private Place destination;
}
