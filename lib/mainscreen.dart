import 'package:flutter/material.dart';
import 'package:engine_part_app/menu_page.dart';
import 'package:engine_part_app/homescreen.dart';
import 'package:engine_part_app/loadjson.dart';
import 'package:provider/provider.dart';
import 'package:engine_part_app/cart_view.dart';
import 'package:engine_part_app/searchpage.dart';
//import 'package:engine_part_app/common_view.dart';

void main() => runApp(ChangeNotifierProvider(
          create: (context) => Jdatamodel(), child:const Yapp()));

class Yapp extends StatelessWidget {
  const Yapp({super.key});

  @override
  Widget build(BuildContext context) {
    
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: MyNavigationBar(),
    );
  }
}

class MyNavigationBar extends StatefulWidget {
  const MyNavigationBar({super.key});

  @override
  State<MyNavigationBar> createState() => _MyNavigationBarState();
}

class _MyNavigationBarState extends State<MyNavigationBar> {
  int _selectedIndex = 0;
   TextEditingController search1 = TextEditingController();

 

  static final List<Widget> _widgetOptions = [
    const Grid(),
    const Text('Search Page',
        style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold)),
    const ShoppingCart(),
    const Menupage(),
  ];

  void _onItemTapped(int index) {
    setState((){
    _selectedIndex = index;
    
    }
    );
  }



  @override
  Widget build(BuildContext context) {
   Jdatamodel mode = Provider.of<Jdatamodel> (context, listen: false);
     return Consumer<Jdatamodel> (builder: (context,update,child){
      return Scaffold(
        appBar: AppBar(
          backgroundColor:const Color.fromARGB(255, 145, 216, 148),
          title: Container( decoration: BoxDecoration(color:Colors.white, borderRadius: BorderRadius.circular(4.0)),
            child: Padding(padding: const EdgeInsets.all(1.0),
              child: Row( children: [
                const SizedBox(width: 10.0),
                const SizedBox(width: 10.0),
                const Icon(Icons.search, color: Colors.black),
                const SizedBox(width: 10.0),
                Row(mainAxisAlignment: MainAxisAlignment.end, children: [
                  SizedBox(width:270,height:45,child:
                    TextField( keyboardType: TextInputType.text, controller: search1,  decoration: const InputDecoration( border:InputBorder.none, hintText:'search engineparts' )
                    ),
                  ),

                  GestureDetector(onTap: () {
                    if(historylist.isEmpty){
                   //do nothing
                    }
                    historylist.add(history(viewhistory: search1.text));
                    Navigator.push(context, MaterialPageRoute(builder: (context) => const searchhistory(),));
                  
                    }, 
                    child: const Icon(Icons.mic_rounded, color: Colors.black),
                  ),
                  ],
                )
               ],
              )       
            )
          ),
        ),
          
          body: 
            Center(child:
              _widgetOptions.elementAt(_selectedIndex),

            ),

        bottomNavigationBar: BottomNavigationBar(
          items: <BottomNavigationBarItem> [
            const BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: ('Home'),
            
          
            ),
            const BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: ('Search'),
              
            ),
            BottomNavigationBarItem(
            icon: const Icon(Icons.shopping_cart),
            label: (' Item: ${mode.addtocartlist.length.toString()}'),
             
            ),
            const BottomNavigationBarItem(
            icon: Icon(Icons.menu),
            label: ('Menu'),
             
            ),
          ],
          type: BottomNavigationBarType.shifting,
          fixedColor: Colors.blue,
          currentIndex: _selectedIndex,
          selectedItemColor: Colors.green,
          unselectedItemColor: Colors.blue,
          iconSize: 15,
          onTap: _onItemTapped,
          elevation: 5),
      );
    }
  );
}
}
    
  

      
                              
                              
    

     
