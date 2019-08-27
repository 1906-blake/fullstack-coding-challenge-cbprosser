package com.revature.repos;

import com.revature.models.GroceryList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GroceryListRepo extends JpaRepository<GroceryList, Integer> {

    @Modifying
    @Query(value = "DELETE FROM grocery_item WHERE grocery_item_id=:id", nativeQuery=true)
    void deleteItem(int id);

    @Modifying
    @Query(value = "DELETE FROM grocery_list WHERE grocery_list_id=:id",
    nativeQuery = true)
    void deleteList(int id);
    
    @Modifying
    @Query(value = "DELETE FROM grocery_item WHERE grocery_list_id=:id",
    nativeQuery = true)
    void deleteAllItemsFromList(int id);
}