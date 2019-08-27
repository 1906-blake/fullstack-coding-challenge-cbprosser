package com.revature.services;

import java.util.List;

import javax.transaction.Transactional;

import com.revature.models.GroceryItem;
import com.revature.models.GroceryList;
import com.revature.repos.GroceryListRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroceryListService {

    @Autowired
    private GroceryListRepo glRepo;

	public List<GroceryList> findAll() {
		return glRepo.findAll();
	}

	public GroceryList createGroceryList(GroceryList newList) {
		return glRepo.saveAndFlush(newList);
	}

	@Transactional
	public GroceryList addItemToList(GroceryItem newItem, int id) {
		GroceryList listToUpdate = glRepo.getOne(id);
		newItem.setList(listToUpdate);
		listToUpdate.getItems().add(newItem);
		return listToUpdate;
	}

	@Transactional
	public void removeGroceryList(int id) {
		GroceryList listToDelete = glRepo.getOne(id);
		glRepo.deleteAllItemsFromList(listToDelete.getId());
		glRepo.deleteList(listToDelete.getId());
	}

	@Transactional
	public void removeItemFromList(int id, int itemId) {
		GroceryList listToDeleteFrom = glRepo.getOne(id);
		for(int i = 0; i < listToDeleteFrom.getItems().size(); i++) {
			if(listToDeleteFrom.getItems().get(i).getId() == itemId) {
				glRepo.deleteItem(listToDeleteFrom.getItems().get(i).getId());
				break;
			}
		}
	}
}