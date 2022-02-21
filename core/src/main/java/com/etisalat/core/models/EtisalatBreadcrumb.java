package com.etisalat.core.models;

import java.util.List;

public interface EtisalatBreadcrumb {

  /**
   * @return a collection of objects representing the breadcrumb items that compose the list.
   */
  List<EtisalatBreadcrumbVO> getEtisalatBreadcrumbItems();

}
