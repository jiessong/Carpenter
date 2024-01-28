package com.js.carpenter.controller;

import com.js.carpenter.model.RequiredItem;
import com.js.carpenter.service.impl.WoodServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class WoodController {

    WoodServiceImpl woodServiceImpl = new WoodServiceImpl();

    @GetMapping("/")
    public ResponseEntity<Double> getWoodSize() {

        try{
            double woodLength = woodServiceImpl.getWoodLength();
            return new ResponseEntity<>(woodLength, HttpStatus.OK);
        }catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/woodsize")
    public ResponseEntity<Double> changeWoodSize(@RequestBody Double size) {
//        requestBody: , data;   requestParam: ?size=      pathVariable:  /:id
        try{
            woodServiceImpl.changeWoodLength(size);
            return new ResponseEntity<>(size, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/woodsize")
    public ResponseEntity<List<List<Double>>> calculateCuttingPlan(@RequestBody List<RequiredItem> requiredItemList) {
        try{
            List<List<Double>> cuttings = woodServiceImpl.getCutting(requiredItemList);
            return new ResponseEntity<>(cuttings, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
