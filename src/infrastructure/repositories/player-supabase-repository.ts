// src/infrastructure/repositories/player-supabase-repository.ts
// Supabase implementation of the PlayerRepository interface

import { supabase } from '../supabase/client';
import { Player } from '../../domain/player/model';
import { PlayerRepository } from '../../domain/player/repository';
import { PLAYER_ERRORS } from '../../domain/player/errors';

export class PlayerSupabaseRepository implements PlayerRepository {
    async findById(id: string): Promise<Player | null> {
        const { data, error } = await supabase
            .from('players')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            if (error.code === 'PGRST116' || error.message?.toLowerCase().includes('not found')) {
                throw new Error(PLAYER_ERRORS.NOT_FOUND);
            }
            throw new Error('player.error.fetch_failed');
        }
        if (!data) return null;
        return this.mapToDomainPlayer(data);
    }

    async findByUserId(userId: string): Promise<Player | null> {
        const { data, error } = await supabase
            .from('players')
            .select('*')
            .eq('userId', userId)
            .single();
        if (error) {
            if (error.code === 'PGRST116' || error.message?.toLowerCase().includes('not found')) {
                throw new Error(PLAYER_ERRORS.NOT_FOUND);
            }
            throw new Error('player.error.fetch_failed');
        }
        if (!data) return null;
        return this.mapToDomainPlayer(data);
    }

    async save(player: Player): Promise<void> {
        const { error } = await supabase
            .from('players')
            .upsert({
                id: player.id,
                userId: player.userId,
                personal: player.personal,
                physical: player.physical,
                career: player.career,
                archetype: player.archetype,
                createdAt: player.createdAt.toISOString(),
                updatedAt: player.updatedAt.toISOString(),
            });
        if (error) {
            throw new Error('player.error.save_failed');
        }
    }

    private mapToDomainPlayer(data: any): Player {
        return new Player({
            id: data.id,
            userId: data.userId,
            personal: data.personal,
            physical: data.physical,
            career: data.career,
            archetype: data.archetype,
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt),
        });
    }
}
