import 'package:flutter/material.dart';

class Registrationtoggle extends StatelessWidget {
  const Registrationtoggle({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: MediaQuery.of(context).size.height * 5,
      child: Column(
        children: [
            SizedBox(height: 20),
          Text("Welcome what type of user are you?"),
          SizedBox(height: 10),
          ElevatedButton(onPressed: (){}, child: Text("General User/Consumer")),
           SizedBox(height: 10),
         ElevatedButton(onPressed: (){}, child: Text("Farmer"))
        ],
      ),
    );
  }
}
