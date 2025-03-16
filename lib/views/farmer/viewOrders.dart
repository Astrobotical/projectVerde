import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../state/orders/orders_bloc.dart';
class viewOrders extends StatelessWidget {
  const viewOrders({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("View Orders"),),
      body: BlocBuilder<OrdersBloc, OrdersState>(
        builder: (context, state) {
          if (state is OrdersLoading) {
            return const Center(child: CircularProgressIndicator());
          } else if (state is OrdersLoaded) {
            return ListView.builder(
              itemCount: state.orders.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(state.orders[index]),
                  leading: const Icon(Icons.shopping_cart),
                );
              },
            );
          } else if (state is OrdersError) {
            return const Center(child: Text("Failed to load orders"));
          }
          return const Center(child: Text("No orders available"));
        },
      ),
    );
  }
}
