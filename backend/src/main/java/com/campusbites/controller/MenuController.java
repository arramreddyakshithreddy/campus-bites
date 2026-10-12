package com.campusbites.controller;

import com.campusbites.model.MenuItem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class MenuController {
    private final List<MenuItem> menu = List.of(
        new MenuItem(1L, "Masala Dosa", "Crispy dosa, potato masala & coconut chutney", "Breakfast", 55, "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=85", "Canteen classic", true),
        new MenuItem(2L, "Veg Fried Rice", "Wok-tossed rice with vegetables and spring onion", "Meals", 85, "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=85", "Popular", true),
        new MenuItem(3L, "Paneer Wrap", "Spiced paneer, crunchy salad & mint sauce", "Snacks", 75, "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85", "Fresh pick", true),
        new MenuItem(4L, "Classic Veg Burger", "Grilled veggie patty, lettuce & house sauce", "Snacks", 65, "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=85", "", true),
        new MenuItem(5L, "Chicken Biryani", "Aromatic basmati rice, warm spices & raita", "Meals", 120, "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=85", "Student favourite", false),
        new MenuItem(6L, "Cold Coffee", "Chilled creamy coffee with a cocoa finish", "Drinks", 45, "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85", "", true),
        new MenuItem(7L, "Idli Sambar", "Soft steamed idlis with comforting sambar", "Breakfast", 40, "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=85", "Light & lovely", true),
        new MenuItem(8L, "Choco Brownie", "Fudgy chocolate brownie for your sweet break", "Desserts", 50, "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85", "", true),
        new MenuItem(9L, "Lemon Mint Cooler", "Fresh lime, mint and a little sparkle", "Drinks", 35, "https://images.unsplash.com/photo-1513558161293-cdacff720fc8?auto=format&fit=crop&w=900&q=85", "Refreshing", true)
    );

    @GetMapping("/api/menu")
    public List<MenuItem> getMenu() {
        return menu;
    }
}
