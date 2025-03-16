import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../state/userProfile/user_profile_bloc.dart';

class userProfile extends StatelessWidget {
  const userProfile({super.key});

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
        appBar: AppBar(
          title: const Text("Profile"),
          leading: IconButton(
            icon: const Icon(Icons.arrow_back,color: Colors.black,),
            onPressed: () {
              Navigator.of(context).pop();
            },
          ),
          actions: [
            TextButton(
              onPressed: () {
                // Handle logout logic
              },
              child: const Text("Logout", style: TextStyle(color: Colors.black)),
            ),
          ],
        ),
        body: BlocBuilder<UserProfileBloc, UserProfileState>(
          builder: (context, state) {
            if (state is ProfileLoading) {
              return const Center(child: CircularProgressIndicator());
            } else if (state is ProfileLoaded) {
              return Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 20),
                    TextFormField(
                      initialValue: "${state.buyer.name.firstName} ${state.buyer.name.lastName}",
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      decoration: const InputDecoration(
                        labelText: "Full Name",
                        border: OutlineInputBorder(),
                      ),
                      readOnly: true,
                    ),
                    const SizedBox(height: 10),
                    TextFormField(
                      initialValue: state.buyer.email,
                      style: const TextStyle(color: Colors.grey),
                      decoration: const InputDecoration(
                        labelText: "Email",
                        border: OutlineInputBorder(),
                      ),
                      readOnly: true,
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      initialValue: "Lat: ${state.buyer.coordinates.latitude}, Lng: ${state.buyer.coordinates.longitude}",
                      style: const TextStyle(color: Colors.black),
                      decoration: const InputDecoration(
                        labelText: "Current Location",
                        border: OutlineInputBorder(),
                      ),
                      readOnly: true,
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      initialValue: "${state.buyer.walletBalance}",
                      style: const TextStyle(color: Colors.black),
                      decoration: const InputDecoration(
                        labelText: "Current Balance:",
                        border: OutlineInputBorder(),
                      ),
                      readOnly: true,
                    ),
                    Center(
                      child: ElevatedButton(onPressed: () {
                      }, child: Text("Update Profile")),
                    ),

                  ],
                ),
              );
            } else {
              return const Center(child: Text("Failed to load profile."));
            }
          },
        ),
    );
  }
}