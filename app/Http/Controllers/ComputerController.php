<?php

namespace App\Http\Controllers;

use App\Models\Computer;
use Illuminate\Http\Request;

class ComputerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $withUser = Computer::with('user')->get();
        return $withUser;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */ 
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'serial_number' => 'required|string|unique:computers',
            'manufacturer' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'ram' => 'required|integer',
            'storage' => 'required|integer',
            'operating_system' => 'required|string|max:255',
            'purchase_date' => 'required|date',
            'cost' => 'required|numeric',
            'notes' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
        ]);

        return Computer::create($validated);
    }
    
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Computer  $computer
     * @return \Illuminate\Http\Response
     */
    public function show(Computer $computer)
    {
        return $computer;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Computer  $computer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Computer $computer)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'serial_number' => 'sometimes|string|unique:computers,serial_number,' . $computer->id,
            'manufacturer' => 'sometimes|string|max:255',
            'model' => 'sometimes|string|max:255',
            'ram' => 'sometimes|integer',
            'storage' => 'sometimes|integer',
            'operating_system' => 'sometimes|string|max:255',
            'purchase_date' => 'sometimes|date',
            'cost' => 'sometimes|numeric',
            'notes' => 'nullable|string',
            'user_id' => 'sometimes|exists:users,id',
        ]);

        $computer->update($validated);
        return $computer;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Computer  $computer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Computer $computer)
    {
        $computer->delete();
        return response()->noContent();
    }
}
