package com.revature.controllers;

import java.util.List;

import com.revature.models.GroceryItem;
import com.revature.models.GroceryList;
import com.revature.services.GroceryListService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/grocery-lists")
public class GroceryListController {

    @Autowired
    private GroceryListService glService;

    @GetMapping
    public List<GroceryList> findAll() {
        return glService.findAll();
    }

    @PostMapping
    public GroceryList createGroceryList(@RequestBody GroceryList newList) {
        return glService.createGroceryList(newList);
    }

    @PostMapping("/{id}/items")
    public GroceryList addItemToList(@RequestBody GroceryItem newItem, @PathVariable(name = "id") int id) {
        return glService.addItemToList(newItem, id);
    }

    @DeleteMapping("/{id}")
    public void removeGroceryList(@PathVariable(name = "id") int id) {
        glService.removeGroceryList(id);
    }

    @DeleteMapping("/{id}/items/{itemId}")
    public void removeItemFromList(@PathVariable(name = "id") int id, @PathVariable(name = "itemId") int itemId) {
        glService.removeItemFromList(id, itemId);
    }
}