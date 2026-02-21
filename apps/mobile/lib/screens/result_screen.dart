import 'package:flutter/material.dart';

class ResultScreen extends StatelessWidget {
  const ResultScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Your Cosmic Chart")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: AnimatedOpacity(
          opacity: 1,
          duration: const Duration(seconds: 1),
          child: const Text(
            "✨ Planetary insights loaded successfully!",
            style: TextStyle(fontSize: 18),
          ),
        ),
      ),
    );
  }
}
