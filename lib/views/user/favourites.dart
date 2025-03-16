import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:projectverde/state/favourites/favourites_cubit.dart';

import '../../customWidgets/favouritesContainer.dart';

class favourites extends StatelessWidget {
  const favourites({super.key});

  @override
  Widget build(BuildContext context) {
    final blocContext = context.read<FavouritesCubit>();
    return Scaffold(
      appBar: AppBar(),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            const Align(
                alignment: Alignment.centerLeft,
                child: Padding(
                  padding: EdgeInsets.only(left: 18.0, bottom: 8.0),
                  child: Text(
                    "My Favorites",
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
                  ),
                )),
            SizedBox(
              height: 550,
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2, // Number of columns in the grid
                  crossAxisSpacing: 8.0, // Spacing between columns
                  mainAxisSpacing: 8.0, // Spacing between rows
                ),
                shrinkWrap: true,
                itemCount: blocContext.favourites.length,
                itemBuilder: (context, index) {
                  return favouritesContainer(
                    item:blocContext.favourites[index],
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
