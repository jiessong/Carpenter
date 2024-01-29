package com.js.carpenter.service;

import com.js.carpenter.model.RequiredItem;

import java.util.List;

public interface WoodService {
    int getWoodLength();
    boolean changeWoodLength(int length);
    List<List<Integer>> getCutting(List<RequiredItem> needs);

}
