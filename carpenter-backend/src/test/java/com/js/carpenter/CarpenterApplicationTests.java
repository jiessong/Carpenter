package com.js.carpenter;

import com.js.carpenter.model.RequiredItem;
import com.js.carpenter.service.WoodService;
import com.js.carpenter.service.impl.WoodServiceImpl;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.event.annotation.AfterTestMethod;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class CarpenterApplicationTests {

	@Autowired
	private static WoodService woodService;

	@BeforeAll
	public static void beforeTest(){
		woodService = new WoodServiceImpl();
	}

	@Test
	void testGetCuttingSimple(){
		List<RequiredItem> requiredItemList = new ArrayList<>();
		RequiredItem item1 = new RequiredItem(10, 1);
		requiredItemList.add(item1);
		List<List<Integer>> result = woodService.getCutting(requiredItemList);
		System.out.println("result:" + result);
		List<List<Integer>> answer = new ArrayList<>();
		answer.add(Arrays.asList(10, 5390));
		assertEquals(result, answer);
	}

	@Test
	void testGetCuttingComplex(){
		List<RequiredItem> requiredItemList = new ArrayList<>();
		RequiredItem item1 = new RequiredItem(300, 15);
		RequiredItem item2 = new RequiredItem(120, 80);
		RequiredItem item3 = new RequiredItem(700, 9);
		requiredItemList.add(item1);
		requiredItemList.add(item2);
		requiredItemList.add(item3);
		List<List<Integer>> result = woodService.getCutting(requiredItemList);
		System.out.println("result:" + result);
		List<List<Integer>> answer = new ArrayList<>();
		answer.add(Arrays.asList(700, 700, 700, 700, 700, 700, 700, 300, 120, 80));
		answer.add(Arrays.asList(
				700, 700, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 100
		));
		answer.add(Arrays.asList(
				300, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120,
				120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120,
				120, 60
		));
		answer.add(Arrays.asList(
				120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120,
				120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 960
				));
		assertEquals(result, answer);
	}


	@Test
	void testGetWoodLength(){
		assertEquals(woodService.getWoodLength(), 5400);
	}

	@Test
	void testChangeWoodLength(){
		woodService.changeWoodLength(3000);
		assertEquals(woodService.getWoodLength(), 3000);
		woodService.changeWoodLength(5400);
	}


	@AfterAll
	public static void afterTest(){
		woodService.changeWoodLength(5400);
	}
}
