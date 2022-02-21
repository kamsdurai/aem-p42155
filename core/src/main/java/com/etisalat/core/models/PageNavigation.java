package com.etisalat.core.models;

import java.util.List;

public interface PageNavigation {

  /**
   * @return a collection of objects representing the page navigation items that compose the list.
   */
  List<FixedNavigtaionMultifieldModel> getPageNavItems();

}
