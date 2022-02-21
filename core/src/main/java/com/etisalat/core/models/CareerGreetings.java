package com.etisalat.core.models;

public interface CareerGreetings {

  /**
   * @return a object representing the Cover image item.
   */
  LinkModel getCover();

  /**
   * @return a object representing the image item.
   */
  LinkModel getImage();

  /**
   * @return a object representing the title.
   */
  String getTitle();

  /**
   * @return a object representing the Pre-title.
   */
  String getPreTitle();

  /**
   * @return a object representing the Description.
   */
  String getDescription();


}
