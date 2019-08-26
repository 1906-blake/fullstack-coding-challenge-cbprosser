package com.revature.repos;

import com.revature.models.GroceryList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroceryListRepo extends JpaRepository<GroceryList, Integer> {

    
}