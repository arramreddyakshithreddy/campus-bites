package com.campusbites.model;

import java.util.List;

public record OrderRequest(String studentName, String pickupTime, List<OrderLine> items) {
    public record OrderLine(Long menuItemId, int quantity) {}
}
