package com.etisalat.core.models;

import java.util.List;

public interface Footer {

  /**
   * @return a copy right text.
   */
  String getCopyrightText();

  /**
   * @return a promo detail.
   */
  LinkModel getPromo();

  /**
   * @return a collection of objects representing the QuickLinks.
   */
  List<QuickLinkModel> getQuickLinks();

  /**
   * @return a collection of objects representing the download links.
   */
  List<LinkModel> getDownload();


  /**
   * @return a collection of objects representing the followUs links.
   */
  List<LinkModel> getFollowUs();


  /**
   * @return a collection of objects representing the Payment items.
   */
  List<LinkModel> getPayment();

  /**
   * @return a collection of objects representing the footer links.
   */
  List<LinkModel> getFooterLinks();

}
