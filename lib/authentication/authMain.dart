import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:projectverde/authentication/signUp/registrationtoggle.dart';
import 'package:projectverde/state/authentication/authentication_bloc.dart';

class authMain extends StatefulWidget {
  const authMain({super.key});

  @override
  State<authMain> createState() => _authMainState();
}

class _authMainState extends State<authMain> with TickerProviderStateMixin {
  late final TabController _tabController;
  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
    final blocContext= context.read<AuthenticationBloc>();
    return  Scaffold(
        body: Column(
  children: [
    SizedBox(
      height: 170,
      child: Card(
        color: Theme.of(context).colorScheme.surface,
        child:
            Center(
              child: Text("Project Verde",
                  style: Theme.of(context).textTheme.headlineLarge))
      ),
    ),
    DefaultTabController(
          initialIndex: 1,
          length: 2,
          child: Expanded( // Wrap this with Expanded
            child: Column(
              children: [
                TabBar(
                  controller: _tabController,
                  tabs: <Widget>[
                    Tab(
                        child: Text('Sign in',
                            style: Theme.of(context).textTheme.headlineMedium)),
                    Tab(
                        child: Text('Sign up',
                            style: Theme.of(context).textTheme.headlineMedium)),
                  ],
                ),
                Expanded( // Ensure TabBarView takes up remaining space
                  child: TabBarView(
                    controller: _tabController,
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
      ]
      ),
    );
  }
}
