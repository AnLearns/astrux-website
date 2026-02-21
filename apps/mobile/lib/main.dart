import 'package:flutter/material.dart';
import 'screens/login_screen.dart';

void main() {
  runApp(const AstruxApp());
}

class AstruxApp extends StatelessWidget {
  const AstruxApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'ASTRUX',
      theme: ThemeData.dark(),
      home: const LoginScreen(),
    );
  }
}
