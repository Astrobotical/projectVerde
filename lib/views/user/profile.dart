import 'package:flutter/material.dart';
class userProfile extends StatelessWidget {
  const userProfile({super.key});

  @override
  Widget build(BuildContext context) {
         return Scaffold(
      appBar: AppBar(title: const Text("Profile")),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: 20),
          const SizedBox(height: 10),
          const Text("John Doe", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          const Text("johndoe@example.com", style: TextStyle(color: Colors.grey)),
          const SizedBox(height: 20),
          Expanded(
            child: ListView(
              children: [
                ListTile(
                  leading: const Icon(Icons.settings),
                  title: const Text("Settings"),
                  onTap: () {
                    // Navigate to settings page
                  },
                ),
                ListTile(
                  leading: const Icon(Icons.shopping_bag),
                  title: const Text("My Orders"),
                  onTap: () {
                    // Navigate to orders page
                  },
                ),
                ListTile(
                  leading: const Icon(Icons.logout),
                  title: const Text("Logout"),
                  onTap: () {
                    // Handle logout logic
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
