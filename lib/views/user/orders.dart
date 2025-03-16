import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../state/userOrders/user_orders_cubit.dart' show UserOrdersCubit, UserOrdersError, UserOrdersLoaded, UserOrdersLoading, UserOrdersState;

class userOrders extends StatelessWidget {
  const userOrders({super.key});

  @override
  Widget build(BuildContext context) {
    final List<String> orders = [
      "Order #1234 - Pending",
      "Order #5678 - Delivered",
      "Order #9101 - In Progress",
    ];

    return Scaffold(
      appBar: AppBar(title: const Text("Your Orders")),
      body: BlocBuilder<UserOrdersCubit, UserOrdersState>(
        builder: (context, state) {
          if(state is UserOrdersLoading)
            {
              return const Center(child: CircularProgressIndicator());
            }
          else if (state is UserOrdersLoaded) {
            return ListView.builder(
              itemCount: state.orders.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(state.orders[index]),
                  leading: const Icon(Icons.shopping_cart),
                );
              },
            );
          } else if (state is UserOrdersError) {
            return const Center(child: Text("Failed to load orders"));
          }
          return const Center(child: Text("No orders available"));
        },
      ),
    );
  }
}
