import 'package:flutter/material.dart';
import 'package:projectverde/authentication/signUp/registrationtoggle.dart';

class authMain extends StatelessWidget {
  const authMain({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          bottom: TabBar(tabs: [Tab(text: 'Sign In'), Tab(text: 'Sign Up')]),
        ),
        body: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(
                height: 400, // Adjust height as needed
                child: TabBarView(
                  children: [
  
                    Center(child: Text('Sign In Form')),
          
                    Registrationtoggle(),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
