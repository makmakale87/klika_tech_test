import React from 'react';
import {MusicStyles} from "../../store/Store";
import {YEARS} from "../../dummy_data/data";

const CreateFormView = ({createSong, song, handleInputChange}) => {
    return (
        <div className="row mt-5">
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={createSong}>
                            <div className="form-group">
                                <label htmlFor="artist">Исполнитель</label>
                                <input
                                    name="artist"
                                    className="form-control"
                                    id="artist"
                                    value={song.artist}
                                    onChange={handleInputChange}
                                    required
                                    min={2}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="song">Песня</label>
                                <input
                                    name="song"
                                    className="form-control"
                                    id="song"
                                    value={song.song}
                                    onChange={handleInputChange}
                                    required
                                    min={5}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="styleId">Жанр</label>
                                <select
                                    id="styleId"
                                    name="styleId"
                                    className="custom-select"
                                    value={song.styleId}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Выбрать</option>
                                    {MusicStyles.styles.length > 0 ? (
                                        MusicStyles.styles.map(style => (
                                            <option key={style.id} value={style.id}>{style.style}</option>
                                        ))
                                    ) : null}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="year">Год</label>
                                <select
                                    id="year"
                                    name="year"
                                    className="custom-select"
                                    value={song.year}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Выбрать</option>
                                    {YEARS.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary">Добавить</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateFormView;