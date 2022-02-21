package com.etisalat.core.models;

import java.util.List;

public interface TabImage {

  /**
   * @return a collection of objects representing the tab image items that compose the list.
   */
  List<LinkModel> getTabImageItems();
}
