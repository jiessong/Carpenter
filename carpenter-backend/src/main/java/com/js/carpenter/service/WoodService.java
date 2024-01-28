package com.js.carpenter.service;

import com.js.carpenter.model.RequiredItem;

import java.util.List;
import java.util.Map;

public interface WoodService {
    double getWoodLength();
    boolean changeWoodLength(double length);
    List<List<Double>> getCutting(List<RequiredItem> needs);

}
