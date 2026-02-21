<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('display_name')->nullable()->after('name');
            $table->string('phone')->nullable()->after('email');
            $table->string('avatar')->nullable()->after('phone');
            $table->boolean('notify_order_updates')->default(true)->after('avatar');
            $table->boolean('notify_product_drops')->default(true)->after('notify_order_updates');
            $table->boolean('notify_community_news')->default(false)->after('notify_product_drops');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'display_name',
                'phone',
                'avatar',
                'notify_order_updates',
                'notify_product_drops',
                'notify_community_news',
            ]);
        });
    }
};
