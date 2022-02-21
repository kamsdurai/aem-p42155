package com.etisalat.core.models;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.apache.sling.api.resource.Resource;

public interface ArticleSearch {

  /**
   * @return a collection of objects representing the blog article items that compose the list.
   */
  List<GenericListPageDetails> getBlogPageItems();

  /**
   * @return a business category tag title.
   */
  String getBusinessCategoryTag();


  /**
   * @return a back to business home link.
   */
  String getBackToHomeLink();

  /**
   * @return a collection of objects representing the news room article items that compose the list.
   */
  List<GenericListPageDetails> getNewsPageItems();
  
  /**
   * @return a collection of objects representing the news section article items that compose the list.
   */
  List<GenericListPageDetails> getEwalletNewsSectionItems();


  /**
   * @return a collection of objects representing the category items that compose the map.
   */
  Map<String, Long> getSearchCategories();

  /**
   * return a THUMBNAIL page image resource.
   *
   * @return
   */
  Resource getThumbnailPageResource();
  
  String getArticleDate() throws ParseException;

}
