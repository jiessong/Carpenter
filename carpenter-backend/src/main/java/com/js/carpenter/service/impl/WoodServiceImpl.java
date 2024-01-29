package com.js.carpenter.service.impl;

import com.js.carpenter.model.RequiredItem;
import com.js.carpenter.service.WoodService;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class WoodServiceImpl implements WoodService {
    private int length=5400;
    @Override
    public int getWoodLength() {
        return this.length;
    }

    @Override
    public boolean changeWoodLength(int length) {
        this.length=length;
        return true;
    }

    @Override
    public List<List<Integer>> getCutting(List<RequiredItem> requiredItemList) {
        Collections.sort(requiredItemList);
        List<List<Integer>> cuttings = new ArrayList<>();
        while(!requiredItemList.isEmpty()){
            List<Integer> cuttedWood=new ArrayList<>();
            int currentWood=this.length;
            for(int i=0;i<requiredItemList.size();i++){
                RequiredItem item=requiredItemList.get(i);
               while(currentWood>=item.getLength()&&item.getNumLeft()>0){
                   currentWood-=item.getLength();
                   cuttedWood.add(item.getLength());
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
