//import 'dart:html';

//import 'package:engine_part_app/Credential_Page/Login.dart';
import 'package:engine_part_app/faming_homepage.dart';
import 'package:flutter/material.dart';
import 'package:engine_part_app/menu_page.dart';
//import 'package:engine_part_app/homescreen.dart';
import 'package:engine_part_app/loadjson.dart';
import 'package:provider/provider.dart';
import 'package:engine_part_app/Shopping_Cart_Details/cart_view.dart';
import 'package:engine_part_app/searchpage.dart';
import 'package:engine_part_app/item_model.dart';
import 'package:fluttertoast/fluttertoast.dart';
//import 'package:engine_part_app/common_view.dart';
//cloud_firestore: ^5.2.1

void main() => runApp(ChangeNotifierProvider(
          create: (context) => Jdatamodel(), child:const Yapp()));

class Yapp extends StatelessWidget {
  const Yapp({super.key});

  @override
  Widget build(BuildContext context) {
    
    return  const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Mainpage(),
      // initialRoute: 'begin',
      // routes:{
      //   'begin':(context) => const LogPage(),
      // }
    );
  }
}

class Mainpage extends StatefulWidget {
  const Mainpage({super.key});

  @override
  State<Mainpage> createState() => Mainpagestate();
}

class Mainpagestate extends State<Mainpage> {

  @override 
  void initState(){
    super.initState();
   Provider.of<Jdatamodel> (context, listen: false).loaddata();
    
  }

  int _selectedIndex = 0;
   static TextEditingController search1 = TextEditingController();

 

  static final List<Widget> apppages = [
    const Farmpage(),
    
    const Text('Search Page',
        style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold)),
    ShoppingCart(total:''),
    Menupage(),
  ];
  
  void _onItemTapped(int index) {
    _selectedIndex = index;
    if(_selectedIndex ==0){
      
    setState((){
     Navigator.push(context, MaterialPageRoute(builder: (context)=> const Yapp()));
    
    } 
    );
  }else 
  if(_selectedIndex ==1){
    setState((){
    
     _selectedIndex = index;
    
    } 
    );
  }else
  if(_selectedIndex ==2){
    setState((){
     
     _selectedIndex = index;
    
    } 
    );
  }else
  if(_selectedIndex ==3){
    setState((){
    
     _selectedIndex = index;
    
    } 
    );
  }

  }

      // List <Item>bookitm, String search
      void searchproduct(){
        Jdatamodel mode = Provider.of<Jdatamodel> (context, listen: false);
       //await
       //mode.itemindex = 0;
        for(int i=0; i<sealist.length; i++)
        {
         
          if(sealist[i].description.contains(search1.text))
          {
           mode.searchresult.add(Item(title:sealist[i].title, description: sealist[i].description, price:sealist[i].price,image:sealist[i].image,
           rating: sealist[i].rating));
            print('the search list is: ${mode.searchresult.length}');
          }
          else
          {
          msgtoast(context);
          }
         

        }
      }
 
msgtoast(BuildContext context){
  return
Fluttertoast.showToast(
        msg: "No Result ",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.CENTER,
        timeInSecForIosWeb: 1,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16.0,
    );
}
  @override
  Widget build(BuildContext context) {
    Jdatamodel mode = Provider.of<Jdatamodel> (context, listen: false);
    
    print('I have ${mode.itemlist.length}, item');
    
  
      return Scaffold(

        drawer:smenu(context),
        appBar: AppBar(
           
          toolbarHeight: 100.0,
        
          backgroundColor:Colors.white,
          
          
          title: Column(children: [ Row(children: [
           
              Container( decoration: BoxDecoration(border: Border.all(width:1, color:Color.fromARGB(255, 231, 228, 228)),  color:Colors.white, borderRadius: BorderRadius.circular(4.0)),
            child: Padding(padding: const EdgeInsets.all(1.0),
              child: Row( children: [
               
                const SizedBox(width: 10.0),
                Row(mainAxisAlignment: MainAxisAlignment.end, children: [
                  SizedBox(width:300,height:45,child:
                    TextField( keyboardType: TextInputType.text, controller: search1,  decoration: const InputDecoration( border:InputBorder.none, hintText:'Search for products' )
                    ),
                  ),

                  GestureDetector(onTap: () {
                    if(search1.text.isEmpty){
                      
                    }else{
                    searchproduct();
                  //   if(historylist.isEmpty){
                  //  //do nothing
                  //   }
                  //   historylist.add(history(viewhistory: search1.text));
                    Navigator.push(context, MaterialPageRoute(builder: (context) => const searchhistory(),));
                    }
                  
                    }, 
                    child: const Icon(Icons.search, color: Colors.black),
                  ),
                  const SizedBox(width: 5.0),
                  ]
                )
               ],
              )       
            ),
              ),  
          ]),
          Container(color: Colors.amber.shade50, height: 40, width: 400, child: ListView.builder(itemCount: farmerCat.length,scrollDirection:Axis.horizontal,
    itemBuilder:(context, index){
    return Catdesign(catergories:farmerCat,position: index);
    }
  
  ))
          ],)
          ),
        
        
          body: 
             
            Center(child: 
            
              apppages.elementAt(_selectedIndex),
          
            
            ),
          
        bottomNavigationBar: BottomNavigationBar(
          items: <BottomNavigationBarItem> [
            const BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: ('Home'),
            ),

           //const BottomNavigationBarItem(
            //icon: Icon(Icons.garage_outlined),
            //label: ('Garage'),
           //),

            const BottomNavigationBarItem(
            icon: Icon(Icons.search_outlined),
            label: ('Search'),
              
            ),
            BottomNavigationBarItem(
            icon: const Icon(Icons.shopping_cart_outlined),
            label: (' Item: ${mode.addtocartlist.length.toString()}'),
             
            ),
            const BottomNavigationBarItem(
            icon: Icon(Icons.menu_outlined),
            label: ('Menu'),
             
            ),
          ],
          type: BottomNavigationBarType.shifting,
          currentIndex: _selectedIndex,
          selectedItemColor: Colors.green,
          unselectedItemColor: Colors.blue,
          backgroundColor: Colors.red,
          iconSize: 20,
          onTap: _onItemTapped,
          elevation: 5),
      );
    }
    
  }

  Widget smenu(BuildContext context){
    return Drawer(
    child: ListView(  
    padding: EdgeInsets.zero,  
    children: <Widget>[  
     DrawerHeader( 
      padding: const EdgeInsets.all(15.0), 
      decoration: const BoxDecoration(  
        color: Colors.white12,  
      ),
      child: Row(mainAxisAlignment: MainAxisAlignment.end, crossAxisAlignment: CrossAxisAlignment.start, 
                  children: [
                    GestureDetector(
                       child:
                       const Icon(Icons.close),
                       onTap: (){
                        Navigator.pop(context);
                       },
                    ),
                    const Text('Close',  style: TextStyle(fontSize: 16.0, fontWeight:FontWeight.bold, fontFamily: 'Ariel' )),
                  ]
              ),    
      ),  
      ListTile(  
        title: const Text('School Uniform Supplies', style: TextStyle(fontSize: 12.0, fontWeight:FontWeight.bold, fontFamily: 'Ariel' )), 
        leading: const Icon(Icons.school_outlined) ,
        onTap: () {  
          // Update the state of the app.  
          // ...  
        },  
      ),  
      ListTile(  
        title: const Text('Stationery Supplies', style: TextStyle(fontSize: 12.0, fontWeight:FontWeight.bold, fontFamily: 'Ariel' )),
        leading: Icon(Icons.menu_book),  
        onTap: () {  
          // Update the state of the app.  
          // ...  
        }
      ),

      ListTile(
        title:const Text('Document Request', style: TextStyle(fontSize: 12.0, fontWeight:FontWeight.bold, fontFamily: 'Ariel' )),
        leading: Icon(Icons.edit_document),
        onTap: (){

        } 
      )
      ],  ));
  }


    List <Item> sealist = <Item> [
  Item(title: 'Graph leaves', image:['Graph_leaves.jpg'], description: 'Graph leaves (Application: Math, Physics)', price: 15.0, rating: 3.0 ),
  Item(title:'Pen (3 inks)', image: ['3_ink_pen.jpg'], description: 'A pen with multiple inks in one versatile', price: 15.0, rating: 3.0),
  Item(title:'Pentel Pen', image: ['pentel_pens.jpg'], description: 'A pen you can trust', price: 15.0, rating: 3.0),
  Item(title:'Pencils', image: ['Pencils.jpg'], description: 'HB pencil perfect for you examination', price: 15.0, rating: 3.0),
  Item(title:'Permanent Markers', image:['Permanent_markers.jpg'], description: 'with permanent ink', price: 15.0, rating: 3.0),
  Item(title:'Blank Papers', image: ['Blank_papers.jpg'], description: 'printing sheet to use in printer and other purposes' ,price: 15.0, rating: 3.0),
  Item(title:'Envelopes', image: ['Envelopes.jpg'], description: 'envelopes in different colors', price: 15.0, rating: 3.0),

]; 
  

      
                              
                              
    
class FarmMainpage extends StatefulWidget {
  const FarmMainpage({super.key});

  @override
  State<FarmMainpage> createState() => Farmpagestate();

}

class Farmpagestate extends State<FarmMainpage> {

@override
Widget build(BuildContext context){
  return
  Scaffold(
    
  body:
   ListView.builder(itemCount: farmerCat.length,scrollDirection:Axis.horizontal,
    itemBuilder:(context, index){
    return Catdesign(catergories:farmerCat,position: index);
    }
  
  ));
}
}

List <String> farmerCat = ["Fruit", "Vegetables", "Nuts & Seeds", "Herbs & Spices",'Ground Provision'];


class Catdesign extends StatelessWidget{
  Catdesign({required this.catergories, this.position =0 });
  List catergories ;
  int position;

@override
Widget build(BuildContext context){
  return  Row(mainAxisAlignment:MainAxisAlignment.start,
  children:[ Container(child: Padding(padding:EdgeInsets.all(10.0),child: Text(catergories[position], style:const TextStyle(fontWeight: FontWeight.bold, fontSize: 12.0)),
   )) ]
  )
 
  
  ;
}

}
     
