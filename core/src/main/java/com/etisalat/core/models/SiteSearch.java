package com.etisalat.core.models;

import java.util.List;

public interface SiteSearch {

	/**
	 * 
	 * @return a collection of objects representing the quick links items that compose the list.
	 */
	List<LinkModel> getQuickLinksItems();
	
	/**
	 * 
	 * @return a collection of objects representing the brand links items that compose the list.
	 */
	List<LinkModel> getBrandItems();
}
