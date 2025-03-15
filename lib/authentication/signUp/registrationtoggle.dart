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
            SizedBox(height: MediaQuery.of(context).size.height * 0.01),
          Text("Welcome what type of user are you?"),
          SizedBox(height: MediaQuery.of(context).size.height * 0.05),
          ElevatedButton(onPressed: (){}, child: Text("Everyday Ole User")),
         SizedBox(height: MediaQuery.of(context).size.height * 0.005),
         ElevatedButton(onPressed: (){}, child: Text("Farmer"))
        ],
      ),
    );
  }
}
