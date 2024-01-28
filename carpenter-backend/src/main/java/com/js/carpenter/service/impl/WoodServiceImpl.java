package com.js.carpenter.service.impl;

import com.js.carpenter.model.RequiredItem;
import com.js.carpenter.service.WoodService;

import java.util.*;

public class WoodServiceImpl implements WoodService {
    private double length=5400;
    private ArrayList<Double> wastes = new ArrayList<>();
    private int required;
    @Override
    public double getWoodLength() {
        return this.length;
    }

    @Override
    public boolean changeWoodLength(double length) {
        this.length=length;
        return true;
    }

    @Override
    public List<List<Double>> getCutting(List<RequiredItem> requiredItemList) {
        Collections.sort(requiredItemList);
        int totalRequired = 0;

        List<List<Double>> cuttings = new ArrayList<>();
        while(!requiredItemList.isEmpty()){
            List<Double> cuttedWood=new ArrayList<>();
            double currentWood=this.length;
            for(int i=0;i<requiredItemList.size();i++){
                RequiredItem item=requiredItemList.get(i);
               while(currentWood>=item.getLength()&&item.getNumLeft()>0){
                   currentWood-=item.getLength();
                   cuttedWood.add(Double.valueOf(item.getLength()));
                   item.setNumLeft(item.getNumLeft()-1);
               }
            }
            cuttedWood.add(currentWood);//add the wasted wood
            cuttings.add(cuttedWood);
            //Remove items with 0 left
            Iterator<RequiredItem> iter = requiredItemList.iterator();
            while(iter.hasNext()){
                RequiredItem item = iter.next();
                if(item.getNumLeft()<1){
                    iter.remove();
                }
            }
        }
        return cuttings;
    }


}
