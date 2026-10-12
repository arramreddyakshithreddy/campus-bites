package com.campusbites.service;

import com.campusbites.model.MenuItem;
import com.campusbites.model.OrderRequest;
import com.campusbites.model.OrderResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class OrderService {
    private final List<OrderResponse> orders = new CopyOnWriteArrayList<>();
    private final AtomicInteger sequence = new AtomicInteger(1001);

    private final Map<Long, MenuItem> menu = Map.of(
        1L, new MenuItem(1L, "Masala Dosa", "", "Breakfast", 55, "", "", true),
        2L, new MenuItem(2L, "Veg Fried Rice", "", "Meals", 85, "", "", true),
        3L, new MenuItem(3L, "Paneer Wrap", "", "Snacks", 75, "", "", true),
        4L, new MenuItem(4L, "Classic Veg Burger", "", "Snacks", 65, "", "", true),
        5L, new MenuItem(5L, "Chicken Biryani", "", "Meals", 120, "", "", false),
        6L, new MenuItem(6L, "Cold Coffee", "", "Drinks", 45, "", "", true),
        7L, new MenuItem(7L, "Idli Sambar", "", "Breakfast", 40, "", "", true),
        8L, new MenuItem(8L, "Choco Brownie", "", "Desserts", 50, "", "", true),
        9L, new MenuItem(9L, "Lemon Mint Cooler", "", "Drinks", 35, "", "", true)
    );

    public List<OrderResponse> getOrders() {
        return List.copyOf(orders);
    }

    public OrderResponse placeOrder(OrderRequest request) {
        if (request == null || request.studentName() == null || request.studentName().isBlank()) {
            throw new IllegalArgumentException("Please enter your name.");
        }
        if (request.items() == null || request.items().isEmpty()) {
            throw new IllegalArgumentException("Your cart is empty.");
        }

        List<OrderResponse.OrderedItem> lines = new ArrayList<>();
        double total = 0;
        for (OrderRequest.OrderLine line : request.items()) {
            if (line.quantity() < 1 || line.quantity() > 50) {
                throw new IllegalArgumentException("Quantity must be between 1 and 50.");
            }
            MenuItem item = menu.get(line.menuItemId());
            if (item == null) throw new IllegalArgumentException("Unknown menu item.");
            double lineTotal = item.price() * line.quantity();
            total += lineTotal;
            lines.add(new OrderResponse.OrderedItem(item.id(), item.name(), line.quantity(), item.price(), lineTotal));
        }

        OrderResponse order = new OrderResponse(
            "CB-" + sequence.getAndIncrement(),
            request.studentName().trim(),
            request.pickupTime() == null || request.pickupTime().isBlank() ? "As soon as possible" : request.pickupTime(),
            lines, total, "Confirmed", LocalDateTime.now()
        );
        orders.add(order);
        return order;
    }
}
