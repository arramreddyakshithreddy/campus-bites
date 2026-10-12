package com.campusbites.model;

import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
        String orderNumber,
        String studentName,
        String pickupTime,
        List<OrderedItem> items,
        double total,
        String status,
        LocalDateTime createdAt
) {
    public record OrderedItem(Long menuItemId, String name, int quantity, double unitPrice, double lineTotal) {}
}
