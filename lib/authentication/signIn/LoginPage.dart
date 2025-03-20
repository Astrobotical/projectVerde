import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../state/authentication/authentication_bloc.dart';

class LoginWidget extends StatefulWidget {
  const LoginWidget({super.key});

  @override
  State<LoginWidget> createState() => _LoginWidgetState();
}

class _LoginWidgetState extends State<LoginWidget> {
  late AuthenticationBloc currentContext;
  //ButtonState? changedstate = ButtonState.idle;

  bool isVisible = true;
  @override
  void initState() {
    super.initState();
    currentContext = BlocProvider.of<AuthenticationBloc>(context);
  }

  @override
  Widget build(BuildContext context) {
    final currentState = context.read<AuthenticationBloc>();

    return Card(
      color: Theme.of(context).colorScheme.surface,
      margin: const EdgeInsets.all(16.0),
      child: SingleChildScrollView(
        child: Align(
          alignment: const AlignmentDirectional(0.00, -1.00),
          child: Padding(
            padding: const EdgeInsetsDirectional.fromSTEB(24, 16, 24, 0),
            child: Column(
              mainAxisSize: MainAxisSize.max,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Welcome Back',
                  textAlign: TextAlign.start,
                  style: TextStyle(
                    fontFamily: 'Plus Jakarta Sans',
                    color: Color(0xFF101213),
                    fontSize: 24,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const Padding(
                  padding: EdgeInsetsDirectional.fromSTEB(0, 4, 0, 24),
                  child: Text(
                    'Fill out the information below in order to access your account.',
                    textAlign: TextAlign.start,
                    style: TextStyle(
                      fontFamily: 'Plus Jakarta Sans',
                      color: Color(0xFF57636C),
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 16),
                  child: TextFormField(
                    controller: currentState.loginEmailBox,
                    textCapitalization: TextCapitalization.sentences,
                    obscureText: false,
                    decoration: InputDecoration(
                      labelText: 'Email',
                      labelStyle: const TextStyle(
                        fontFamily: 'Plus Jakarta Sans',
                        color: Color(0xFF57636C),
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                      ),
                      hintStyle: const TextStyle(
                        fontFamily: 'Plus Jakarta Sans',
                        color: Color(0xFF57636C),
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(
                          color: Color(0xFFE0E3E7),
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(
                          color: Color(0xFF4B39EF),
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      errorBorder: OutlineInputBorder(
                        borderSide: const BorderSide(
                          color: Color(0xFFFF5963),
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      focusedErrorBorder: OutlineInputBorder(
                        borderSide: const BorderSide(
                          color: Color(0xFFFF5963),
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      filled: true,
                      fillColor: const Color(0xCCFFFFFF),
                    ),
                    style: const TextStyle(
                      fontFamily: 'Plus Jakarta Sans',
                      color: Color(0xFF101213),
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsetsDirectional.fromSTEB(8, 0, 8, 16),
                  child: TextFormField(
                    controller: currentState.loginPasswordBox,
                    textCapitalization: TextCapitalization.sentences,
                    decoration: InputDecoration(
                      labelText: 'Password',
                      labelStyle: const TextStyle(
                        fontFamily: 'Plus Jakarta Sans',
                        color: Color(0xFF57636C),
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                      ),
                      hintStyle: const TextStyle(
                        fontFamily: 'Plus Jakarta Sans',
                        color: Color(0xFF57636C),
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(
                          color: Color(0xFFE0E3E7),
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(
                          color: Color(0xFF4B39EF),
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      errorBorder: OutlineInputBorder(
                        borderSide: const BorderSide(
                          color: Color(0xFFFF5963),
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      focusedErrorBorder: OutlineInputBorder(
                        borderSide: const BorderSide(
                          color: Color(0xFFFF5963),
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      filled: true,
                      fillColor: const Color(0xCCFFFFFF),
                      suffixIcon: InkWell(
                        onTap: () {
                          setState(() {
                            if (isVisible) {
                              isVisible = false;
                            } else {
                              isVisible = true;
                            }
                          });
                        },
                        focusNode: FocusNode(skipTraversal: true),
                        child:
                            isVisible
                                ? GestureDetector(
                                  onTap: () {},
                                  child: const Icon(
                                    Icons.visibility_outlined,
                                    color: Color(0xFF57636C),
                                    size: 20,
                                  ),
                                )
                                : GestureDetector(
                                  onTap: () {
                                    setState(() {
                                      isVisible;
                                    });
                                  },
                                  child: const Icon(
                                    Icons.visibility_off_outlined,
                                    color: Color(0xFF57636C),
                                    size: 20,
                                  ),
                                ),
                      ),
                    ),
                    style: const TextStyle(
                      fontFamily: 'Plus Jakarta Sans',
                      color: Color(0xFF101213),
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                    ),
                    obscureText: isVisible,
                  ),
                ),
                BlocBuilder<AuthenticationBloc, AuthenticationState>(
                  builder: (context, state) {
                    return Align(
                      alignment: const AlignmentDirectional(0.00, 0.00),
                      child: Padding(
                        padding: const EdgeInsetsDirectional.fromSTEB(
                          0,
                          0,
                          0,
                          16,
                        ),
                        child: ElevatedButton.icon(
                          icon: Icon(Icons.send, color: Colors.purple),
                          label: Text("Send", style: TextStyle()),
                          onPressed: () async {
                            currentState.login();
                          },
                        ),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
