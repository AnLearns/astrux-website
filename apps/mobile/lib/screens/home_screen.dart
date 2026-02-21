import 'package:flutter/material.dart';
import 'kundli_screen.dart';
import 'horoscope_screen.dart';
import 'dasha_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  Map<String, dynamic>? chartData;

  void updateChartData(Map<String, dynamic> data) {
    setState(() => chartData = data);
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4,
      child: Scaffold(
        appBar: AppBar(
          title: const Text("ASTRUX"),
          centerTitle: true,
          bottom: const TabBar(
            tabs: [
              Tab(text: "Kundli"),
              Tab(text: "Horoscope"),
              Tab(text: "Dasha"),
              Tab(text: "Community"),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            KundliScreen(onDataGenerated: updateChartData),
            HoroscopeScreen(data: chartData),
            DashaScreen(data: chartData),
            const Center(child: Text("Community – Coming Soon")),
          ],
        ),
      ),
    );
  }
}
