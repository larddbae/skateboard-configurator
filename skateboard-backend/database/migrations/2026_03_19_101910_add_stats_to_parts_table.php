<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('parts', function (Blueprint $table) {
            $table->decimal('weight', 8, 2)->default(0);
            $table->integer('durability')->default(0);
            $table->integer('speed')->default(0);
            $table->integer('pop')->default(0);
        });
    }

    public function down(): void
    {
        Schema::table('parts', function (Blueprint $table) {
            $table->dropColumn(['weight', 'durability', 'speed', 'pop']);
        });
    }
};
