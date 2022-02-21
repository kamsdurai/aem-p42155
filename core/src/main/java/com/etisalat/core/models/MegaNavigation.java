package com.etisalat.core.models;

import java.util.List;

public interface MegaNavigation {

  /**
   * @return a collection of objects representing the mega navigation items that compose the list.
   */
  List<MegaNavigationItem> getMegaNavigationItems();

  /**
   * @return a collection of objects representing the navigation utility items that compose the
   * list.
   */
  List<MegaNavigationItem> getUtilityNavItems();

  /**
   * Returns the Logo Image File reference.
   *
   * @return
   */
  String getImagePath();

  /**
   * Returns the Logo Link.
   *
   * @return
   */
  String getLogoMenuLink();


  /**
   * @return a collection of objects representing the experience fragment items that compose the
   * list.
   */
  List<MegaNavigationItem> getMegaContainerItems();

  /**
   * @return a collection of objects representing the my account navigation items that compose the
   * list.
   */
  List<MegaNavigationItem> getAccountNavigationItems();

  /**
   * @return a collection of objects representing the top navigation right side items that compose
   * the list.
   */
  List<FixedNavigtaionMultifieldModel> getTopNavMenuItems();

  /**
   * @return a collection of objects representing the top navigation left side items that compose
   * the list.
   */
  List<FixedNavigtaionMultifieldModel> getTopNavIconMenuItems();

  /**
   * @return a collection of objects representing the language items that compose the list.
   */
  List<LinkModel> getLanguageItems();

}
